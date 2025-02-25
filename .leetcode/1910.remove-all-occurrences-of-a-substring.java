/*
 * @lc app=leetcode id=1910 lang=java
 *
 * [1910] Remove All Occurrences of a Substring
 */

// @lc code=start
class Solution {
    public String removeOccurrences(String s, String part) {
        StringBuilder result = new StringBuilder(s);
        
        while (result.indexOf(part) != -1) {
            int startIdx = result.indexOf(part);
            result.delete(startIdx, startIdx + part.length());
        }

        return result.toString();
    }
}
// @lc code=end

