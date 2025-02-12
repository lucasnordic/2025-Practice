/*
 * @lc app=leetcode id=28 lang=java
 *
 * [28] Find the Index of the First Occurrence in a String
 */

// @lc code=start

import java.util.ArrayList;

class Solution {
    public int strStr(String haystack, String needle) {
        // Edge cases
        if (haystack.isEmpty() && needle.isEmpty() || haystack.length() < needle.length()) {
            return -1;
        }

        // go over haystack
        for (int i = 0; i <= haystack.length() - needle.length(); i++) {
            if (haystack.substring(i, i + needle.length()).equals(needle)) {
                return i;
            }
        }

        return -1;
    }
}
// @lc code=end

