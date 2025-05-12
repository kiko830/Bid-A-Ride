using System;
using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _context;

    public AuctionFinishedConsumer(AuctionDbContext context)
    {
        _context = context;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine(" -->Consuming auction finished");
        var message = context.Message;
        var auction = await _context.Auctions.FindAsync(Guid.Parse(message.AuctionId));

        if (message.ItemSold)
        {
            auction.Winner = message.Winner;
            auction.SoldAmount = message.Amount;
        }

        auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;

        await _context.SaveChangesAsync();
    }
}

