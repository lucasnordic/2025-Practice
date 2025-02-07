/*
 * @lc app=leetcode id=151 lang=java
 *
 * [151] Reverse Words in a String
 */

// @lc code=start

import java.util.ArrayList;

class Solution {
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        ArrayList<String> strings = new ArrayList<>();

        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                if (!sb.isEmpty()) {
                    strings.add(sb.toString());
                }
                sb = new StringBuilder();
                continue;
            }

            sb.append(s.charAt(i));

            if (s.length() - 1 == i) {
                if (!sb.isEmpty()) {
                    strings.add(sb.toString());
                }
            }
        }

        sb = new StringBuilder();
        for (int i = strings.size() - 1; i >= 0; i--) {
            if (i != 0) {
                sb.append(strings.get(i) + " ");
            } else {
                sb.append(strings.get(i));
            }
        }

        return sb.toString();
    }
}
// @lc code=end

