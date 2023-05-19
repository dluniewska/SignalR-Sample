using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;

        public async Task NewWindowLoaded()
        {
            TotalViews++;

            //send update to all connected clients that TotalViews have been updated
            await Clients.All.SendAsync("updatedTotalViews", TotalViews);
        }
    }
}
