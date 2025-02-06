/*
 * @lc app=leetcode id=1768 lang=java
 *
 * [1768] Merge Strings Alternately
 */

// @lc code=start
class Solution {
    public String mergeAlternately(String word1, String word2) {
        String mergedString = "";
        int iteration = 0;

        while (iteration < word1.length() && iteration < word2.length()) {
            mergedString += word1.charAt(iteration);
            mergedString += word2.charAt(iteration);
            iteration++;                                
        }                                               

        if (iteration < word1.length()) {
            mergedString += word1.substring(iteration);
        }
        if (iteration < word2.length()) {
            mergedString += word2.substring(iteration);
        }

        return mergedString;
    }
}
// @lc code=end

