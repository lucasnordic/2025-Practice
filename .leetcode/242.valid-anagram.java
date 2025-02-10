/*
 * @lc app=leetcode id=242 lang=java
 *
 * [242] Valid Anagram
 */

// @lc code=start

import java.util.HashMap;
import java.util.Map;

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> charCountMap = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            int sAddCharCount = charCountMap.getOrDefault(s.charAt(i), 0) + 1;
            charCountMap.put(s.charAt(i), sAddCharCount);
            int tAddCharCount = charCountMap.getOrDefault(t.charAt(i), 0) - 1;
            charCountMap.put(t.charAt(i), tAddCharCount);
        }

        for (int count : charCountMap.values()) {
            if (count != 0) {
                return false;
            }
        }

        return true;
    }
}
// @lc code=end

