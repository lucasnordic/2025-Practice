/*
 * @lc app=leetcode id=3174 lang=java
 *
 * [3174] Clear Digits
 */

// @lc code=start
class Solution {
    public String clearDigits(String s) {
        HashSet<Character> numbers = new HashSet<>(
            Arrays.asList('0','1','2','3','4','5','6','7','8','9'));
        StringBuilder result = new StringBuilder(s);

        while (true) {
            int digitIndex = -1;
            int leftCharIndex = -1;
            // find first digit
            for (int i = 0; i < result.length(); i++) {
                if (numbers.contains(result.charAt(i))) {
                    digitIndex = i;
                    break;
                }
            }

            // if no digit, problem is solved
            if (digitIndex == -1) {
                break;
            }

            // find closest char to left
            for (int i = digitIndex - 1; i >= 0; i--) {
                if (!numbers.contains(result.charAt(i))) {
                    leftCharIndex = i;
                    break;
                }
            }

            // delete closest non digit to left
            if (leftCharIndex != -1) {
                result.deleteCharAt(digitIndex);
                result.deleteCharAt(leftCharIndex);
            } else {
                result.deleteCharAt(digitIndex);
            }
        }

        return result.toString();
    }
}
// @lc code=end

