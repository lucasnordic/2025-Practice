/*
 * @lc app=leetcode id=1071 lang=java
 *
 * [1071] Greatest Common Divisor of Strings
 */

// @lc code=start
class Solution {
    public String gcdOfStrings(String str1, String str2) {                      // ABABAB  ABAB
        // 1. find GCD of the lengths
        int len1 = str1.length();
        int len2 = str2.length();
        int gcdLength = gcd(len1, len2);

        // 2. Get potential candidate
        String candidate = str1.substring(0, gcdLength);            // AB

        // 3.1 if both strings can be divided by candidate, return candidate
        if(checkDivides(candidate, str1) && checkDivides(candidate, str2)) {    // AB, ABABAB
            return candidate;
        }

        // 3.2 else return empty string
        return "";
    }

    // Find the GCD of two numbers
    private int gcd(int a, int b) { // 6,4
        while (b != 0) {            // 4    2   0
            int temp = b;           // 4    2
            b = a % b;              // 2    0
            a = temp;               // 4    2
        }

        return a;                   // 2
    }

    private boolean checkDivides(String div, String str) {                      // AB, ABABAB
        // 3.1.1 check how many times a divider can fit into a str.
        int repeatAmount = str.length() / div.length();                         // 6/2 = 3

        // 3.1.2 repeat that many times to see if we get the string
        String builtString = div.repeat(repeatAmount);                          // AB AB AB = ABABAB

        // 3.1.2 return true or false if the new string equals the wanted string.
        return builtString.equals(str);                                         // ABABAB == ABABAB
    }
}
// @lc code=end

