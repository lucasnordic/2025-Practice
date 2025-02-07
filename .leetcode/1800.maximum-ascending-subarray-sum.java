/*
 * @lc app=leetcode id=1800 lang=java
 *
 * [1800] Maximum Ascending Subarray Sum
 */

// @lc code=start
class Solution {
    public int maxAscendingSum(int[] nums) {
        int i = 0;
        int maxSum = 0;

        while ( i < nums.length) { 
            int currSum = nums[i];

            while (i + 1 < nums.length && nums[i] < nums[i+1]) {
                currSum += nums[i+1];
                i++;
            }

            if (currSum > maxSum) {
                maxSum = currSum;
            }

            i++;
        }
    
    return maxSum;

    }
}
// @lc code=end

