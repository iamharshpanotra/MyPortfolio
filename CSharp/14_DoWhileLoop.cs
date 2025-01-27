using System;

namespace CSharp
{
    class _14_DoWhileLoop
    {
        public static void While()
        {
            Console.WriteLine("Please enter your choice");
            int choice = int.Parse(Console.ReadLine());

            int cost = 0;

            // While loop to display costs
            while (cost <= choice)
            {
                Console.Write(cost + " ");
                cost += 2;
            }

            // Do-while loop for user confirmation
            string userChoice;
            do
            {
                Console.WriteLine("\nDo you want to continue - Yes or No? ");
                userChoice = Console.ReadLine();

                if (userChoice != "Yes" && userChoice != "No")
                {
                    Console.WriteLine("Invalid Choice, Please enter Yes or No.");
                }

            } while (userChoice != "No"); // Continue until the user enters "No"

            Console.WriteLine("Exiting program.");
        }
    //    static void Main(string[] args)
    //    {
    //        // Call the While method here to run the program
    //        While();
    //    }
    }
}
