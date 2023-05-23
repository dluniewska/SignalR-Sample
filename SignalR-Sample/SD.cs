namespace SignalR_Sample
{
    public static class SD
    {
        static SD()
        {
            DeathlyHallowsRace = new Dictionary<string, int>
            {
                { Cloak, 0 },
                { Wand, 0 },
                { Stone, 0 }
            };
        }

        public const string Wand = "wand";
        public const string Stone = "stone";
        public const string Cloak = "cloak";

        public static Dictionary<string, int> DeathlyHallowsRace; 
    }
}
