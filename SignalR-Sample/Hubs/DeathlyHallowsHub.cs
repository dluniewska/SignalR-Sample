using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowsRace;
        }

        // first method to get values on first page load
        //public override Task OnConnectedAsync()
        //{
        //    Clients.All.SendAsync("updateDeathlyHallowsCount", SD.DeathlyHallowsRace[SD.Cloak], SD.DeathlyHallowsRace[SD.Stone], SD.DeathlyHallowsRace[SD.Wand]).GetAwaiter().GetResult();
        //    return base.OnConnectedAsync();
        //}
    }
}
