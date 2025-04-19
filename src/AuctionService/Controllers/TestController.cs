using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    [HttpPut("{id}")]
    public IActionResult Update(Guid id, [FromBody] string dummy)
    {
        return Ok($"Updated {id}");
    }
}
