/*
 * @lc app=leetcode id=1790 lang=java
 *
 * [1790] Check if One String Swap Can Make Strings Equal
 */

// @lc code=start

import java.util.ArrayList;

class Solution {
    public boolean areAlmostEqual(String s1, String s2) {
        ArrayList<Integer> mismatchedIndices = new ArrayList<>();
        
        if (s1.equals(s2)) {
            return true;
        }
        
        for (int i = 0; i < s1.length(); i++) {
            if (s1.charAt(i) != s2.charAt(i)) {
                mismatchedIndices.add(i);
            }

            if (mismatchedIndices.size() > 2) {
                return false;
            }
        }
        
        if (mismatchedIndices.size() == 2) {
            int i = mismatchedIndices.get(0);
            int j = mismatchedIndices.get(1);

            if (s1.charAt(i) == s2.charAt(j) && s1.charAt(j) == s2.charAt(i)) {
                return true;
            }
        }

        return false;
    }
}
// @lc code=end

