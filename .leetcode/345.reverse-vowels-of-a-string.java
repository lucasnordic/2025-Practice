/*
 * @lc app=leetcode id=345 lang=java
 *
 * [345] Reverse Vowels of a String
 */

// @lc code=start

import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public String reverseVowels(String s) {
        if (s == null || s.isEmpty()) {
            return s;
        }

        ArrayList<Character> vowels = new ArrayList<>(Arrays.asList('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'));
        StringBuilder result = new StringBuilder(s);
        int left = 0;
        int right = s.length() - 1;

        // Reverse vowels
        while (left < right){
            // If both are vowels, swap
            if (vowels.contains(s.charAt(left)) && vowels.contains(s.charAt(right))) {
                char temp = result.charAt(left);
                result.setCharAt(left, result.charAt(right));
                result.setCharAt(right, temp);
                left++;
                right--;
            } else {
                // move pointers
                if (!vowels.contains(s.charAt(left))) left++;
                if (!vowels.contains(s.charAt(right))) right--;
            }
        }

        return result.toString();
    }
}
// @lc code=end

