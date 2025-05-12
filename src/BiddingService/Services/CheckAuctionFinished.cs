using System;
using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceScopeFactory _services;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceScopeFactory services)
    {
        _logger = logger;
        _services = services;
    }
   
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting check for finished auctions");
        stoppingToken.Register(() => _logger.LogInformation("Stopping check for finished auctions"));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckAuctions(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuctions = await DB.Find<Auction>()
            .Match(a => a.AuctionEnd <= DateTime.UtcNow)
            .Match(x => !x.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuctions.Count == 0) return;
        _logger.LogInformation($"Found {finishedAuctions.Count} finished auctions");

        using var scope = _services.CreateScope();

            var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();
            foreach (var auction in finishedAuctions)
            {
                auction.Finished = true;
                await auction.SaveAsync(null, stoppingToken);
                var winningBid = await DB.Find<Bid>()
                    .Match(a => a.AuctionId == auction.ID)
                    .Match(b => b.BidStatus == BidStatus.Accepted)
                    .Sort(b => b.Descending(x => x.Amount))
                    .ExecuteFirstAsync(stoppingToken);
                
                 await endpoint.Publish(new AuctionFinished{
                    AuctionId = auction.ID,
                    ItemSold = winningBid != null,
                    Amount = winningBid?.Amount,
                    Winner = winningBid?.Bidder,
                    Seller = auction.Seller
                }, stoppingToken);
            }

           
 
    }
}
