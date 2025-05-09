using System.Data.Common;
using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReservePriceGtZero_True()
    {
        // Arrange
        var auction = new Auction{Id=Guid.NewGuid(), ReservePrice = 10};
      
        // Act
        var result = auction.HasResevePrice();

        // Assert
        Assert.True(result);
    }
}