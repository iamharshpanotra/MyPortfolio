using System;

namespace CSharp
{
    class _13_WhileLoop
    {
        public static void While()
        {
            Console.WriteLine("Please enter your choice");
            int choice = int.Parse(Console.ReadLine());

            int cost = 0;

            while (cost <= choice)
            {
                Console.Write(cost + " ");
                cost = cost + 2;
            }

            Console.ReadLine(); // To keep the console window open after execution
        }

        // Main method to start the execution
        //static void Main(string[] args)
        //{
        //    // Call the While method here to run the program
        //    While();
        //}
    }
}
