/*
 * @lc app=leetcode id=1431 lang=java
 *
 * [1431] Kids With the Greatest Number of Candies
 */

// @lc code=start

import java.util.ArrayList;

class Solution {
    public ArrayList<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        ArrayList<Boolean> result = new ArrayList<>();

        for (int i = 0; i < candies.length; i++) {
            boolean greatestNumber = false;
            int kidCandies = candies[i] + extraCandies; // 5

            for (int j = 0; j < candies.length; j++) {
                if (j == i) { 
                    continue;                           // c
                }

                int otherKidCandies = candies[j];       //      3   5

                if (kidCandies >= otherKidCandies) { 
                    greatestNumber = true;              //      t   f
                } else {
                    greatestNumber = false;             //    
                    break;
                }
            }

            if (greatestNumber) {
                result.add(true);
            } else {
                result.add(false);
            }
        }

        return result;
    }
}
// @lc code=end

