using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TTSW.Constant;
using MimeTypes;
using System.Net.Http;
using System.Xml.Serialization;
using System.Xml;

namespace TTSW.Utils
{
    public class PriceUtils
    {
        public PriceUtils()
        {

        }

        public static long RoundCarPrice(long input)
        {
            // Make sure the input is 3 digits or more
            if (input < 99)
            {
                return 0;
            }

            // Determine the divisor based on the number of digits in the input
            long divisor = (long)Math.Pow(10, (int)Math.Log10(input) - 1);

            // Extract the first two digits and the subsequent digits
            // eg. 12345 -> 12 and 345
            long a = input / divisor;
            long b = input % divisor;

            // If the first digit of (b) is greater than or equal to 5, increment (a)
            // and set (b) to 0
            // eg. 12345 
            //       12 (a) and 345 (b) 
            //       result from condition is 12 (a) and 0 (b)
            // or 12534
            //       12 (a) and 534 (b)
            //       result from condition is 13 (a) and 0 (b)
            if (b / (divisor / 10) >= 5)
            {
                a++;
            }
            b = 0;

            // Merge (a) and (b) and return the result
            // from the example above statements, 
            // if input is 12345,
            // the result of a is 12 and b is 0
            // and divisor is 1000
            // the result of this method is 12000
            return a * divisor + b;
        }
    }
}
