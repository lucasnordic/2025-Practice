/*
 * @lc app=leetcode id=389 lang=java
 *
 * [389] Find the Difference
 */

// @lc code=start
/*
 * 
 */

import java.util.ArrayList;

class Solution {
    public char findTheDifference(String s, String t) {
        // Edge cases
        if (s.isEmpty() && t.isEmpty() || s.length() >= t.length()) {
            return 0;
        }

        char[] sArray = s.toCharArray();
        ArrayList<Character> sCharArray = new ArrayList<>();
        for (Character sChar : sArray) {
            sCharArray.add(sChar);
        }

        for (char tChar : t.toCharArray()) {
            if (!sCharArray.contains(tChar)) {
                return tChar;
            }

            sCharArray.remove((Character) tChar);  // Remove first occurrence
        }

        return 0;
    }
}
// @lc code=end

