using MongoDB.Entities;

namespace SearchService.Models
{
    public class Item : Entity
    {
    // id is derived from Entity class, no need to define it again
    // public Guid Id { get; set; } // This is inherited from Entity class
    public int ReservePrice { get; set; }
    public string Seller {get; set;}
    public string Winner { get; set; }
    public int SoldAmount { get; set; }
    public int CurrentHighBid { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime AuctionEnd { get; set; }
    public String Status { get; set; }
    public string Make { get; set; } 
    public string Model { get; set; } 
    public int Year { get; set; } 
    public string Color { get; set; }
    public int Mileage { get; set; }
    public string ImageUrl { get; set; } 
    }
}