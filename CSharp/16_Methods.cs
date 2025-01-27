using System;

namespace CSharp
{
    class Methods
    {
        // Instance method to print even numbers from 0 to 20
        public void EvenNumbers()
        {
            int Start = 0;
            while (Start <= 20)
            {
                Console.WriteLine(Start);
                Start = Start + 2;
            }
            Console.ReadLine();
        }

        // Static method to invoke EvenNumbers using an instance
        public static void Method()
        {
            Program p = new Program();
            p.EvenNumbers();
        }

        // Main method where execution starts
        //static void Main(string[] args)
        //{
        //    // Call the EvenNumbers method
        //    Method();

        //    // Call another method (if you want to use the switch statement or others)
        //    // _11_SwitchStatement.Switch();  // Uncomment this when needed
        //}

    }
}
