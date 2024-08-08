using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TTSW.Utils
{
    public class PasswordGenerator
    {
        // Define default password length and default string representing characters to choose from.
        private const int DefaultPasswordLength = 8;
        private const string PasswordCharsCapital = "ABCDEFGHJKLMNPQRSTUVWXYZ";
        private const string PasswordCharsLower = "abcdefghijkmnpqrstuvwxyz";
        private const string PasswordCharsNumeric = "123456789";
        private const string PasswordCharsSpecial = "@#$%&*";

        // Random instance to generate the random indices.
        private static readonly Random Random = new Random();

        public static string GeneratePassword(int length = DefaultPasswordLength)
        {
            if (length <= 0)
                throw new ArgumentException("Password length should be greater than 0", nameof(length));

            // Build a string consisting of all allowed characters.
            var allAllowedChars = PasswordCharsCapital + PasswordCharsLower + PasswordCharsNumeric + PasswordCharsSpecial;

            // Use a StringBuilder to efficiently build the random password.
            var passwordBuilder = new StringBuilder(length);

            // Generate 'length' number of characters randomly from 'allAllowedChars' and append them to the StringBuilder.
            for (int i = 0; i < length; i++)
            {
                // Generate a random index to select a character.
                var index = Random.Next(allAllowedChars.Length);
                // Append the character at the randomly selected index to the password.
                passwordBuilder.Append(allAllowedChars[index]);
            }

            return passwordBuilder.ToString();
        }
    }
}
