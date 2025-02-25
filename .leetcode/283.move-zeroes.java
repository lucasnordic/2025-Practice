/*
 * @lc app=leetcode id=283 lang=java
 *
 * [283] Move Zeroes
 */

// @lc code=start
/*
 * Attempted
 */
class Solution {
    int zeroCount = 0;

    public void moveZeroes(int[] nums) {
        int rightIndex = 1;
        int leftIndex = 0;

        // for all numbers
        for (int i = 0; i < nums.length; i++) {
            if (rightIndex >= nums.length - 1 || leftIndex >= nums.length - 1) {
                break;
            }
            // if left number is a "0"
            if (nums[leftIndex] == 0) {
    
                // while right number is not a "0"
                while (nums[rightIndex] == 0) {
                    rightIndex++;
                }
                int tempNum = nums[rightIndex];
                nums[rightIndex] = nums[leftIndex];
                nums[leftIndex] = tempNum;
                leftIndex++;
            }
        }

        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i] + ", ");
        }
    }
}
// @lc code=end

