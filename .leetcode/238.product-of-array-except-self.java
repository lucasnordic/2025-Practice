/*
 * @lc app=leetcode id=238 lang=java
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] answer = new int[nums.length];

        // for all nums
        for (int i = 0; i < nums.length; i++) {
            answer[i] = productExceptOne(nums, i);
        }

        for (int i = 0; i < answer.length; i++) {
           System.out.println(answer[i]); 
        }
        
        return answer;
    }

    public int productExceptOne(int[] nums, int ignoreIndex) {
        int sum = 0;
        
        // {1,2,3,4}
        // 0 == 0, sum = 2
        // 1 == 0, sum = 1;

        boolean test = false;
        for (int i = 0; i < nums.length; i++) {
            if (i != ignoreIndex) {
                sum *= nums[i];    
            }
        }
        // 0 == ignoreIndex ? nums[1] : nums[0];
        return sum;
    }
}
// @lc code=end

