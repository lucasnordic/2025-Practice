/*
 * @lc app=leetcode id=2364 lang=java
 *
 * [2364] Count Number of Bad Pairs
 */

// @lc code=start
class Solution {
    public long countBadPairs(int[] nums) {
        if (nums.length <= 1) {
            return 0;
        }
        
        long totalBadPairs = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < nums.length; j++) {
                if (i == j) {
                    continue;
                }

                if (i < j && j - i != nums[j] - nums[i]) {
                    totalBadPairs++;
                }
            }
        }

        return totalBadPairs;
    }
}
// @lc code=end

