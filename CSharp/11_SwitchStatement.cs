using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp
{
    class _11_SwitchStatement
    {
        //public static void Switch()
        //{
        //    Console.WriteLine("Please enter a number");

        //    int number = int.Parse(Console.ReadLine());

        //    switch (number)
        //    {
        //        case 1:
        //            Console.WriteLine("The number is 1");
        //            break;

        //        case 2:
        //            Console.WriteLine("The number is 2");
        //            break;

        //        case 3:
        //            Console.WriteLine("The number is 3");
        //            break;

        //        case 4:
        //            Console.WriteLine("The number is 4");
        //            break;
        //        default:
        //            Console.WriteLine("The number is different.");
        //            break;
        //    }
        //    Console.ReadLine();
        //}

        public static void Switch()
        {
            int totalCost = 0;

        Start:
            Console.WriteLine("1. Coffee, 2. Tea, 3. Drink");

            int userChoice = int.Parse(Console.ReadLine());

            switch (userChoice)
            {
                case 1:
                    totalCost += 1;
                    break;

                case 2:
                    totalCost += 2;
                    break;

                case 3:
                    totalCost += 3;
                    break;

                default:
                    Console.WriteLine("Your choice is {0}", userChoice);
                    goto Start;

            }
        Decide:
            Console.WriteLine("Do you want to buy something another? - Yes or No");
            string option = Console.ReadLine();

            switch (option.ToUpper())
            {
                case "YES":
                    goto Start;

                case "NO":
                    break;
                default:
                    Console.WriteLine("Your choice {0} is invalid. Please try again...", option); ;
                    goto Decide;
            }
            Console.WriteLine("Thanks");
            Console.WriteLine("Bill amount = {0}", totalCost);


            Console.ReadLine();
        }
    }
}
