using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine(" -->Consuming bid placed");
        var message = context.Message;
        var auction = await DB.Find<Item>().OneAsync(message.AuctionId);

        if ( message.BidStatus.Contains("Accepted") && message.Amount > auction.CurrentHighBid)
        {
            
            auction.CurrentHighBid = message.Amount;
            
            await auction.SaveAsync();
        }
       
    }

}
