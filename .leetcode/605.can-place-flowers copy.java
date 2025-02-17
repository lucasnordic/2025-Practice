/*
 * @lc app=leetcode id=605 lang=java
 *
 * [605] Can Place Flowers
 */

// @lc code=start
// [1,0,0,0,0,0,1] 
// [1,0 
//  1,0,0
//    0,1,0             i++
//        0,1,0         i++
//            0,1] 

import java.util.Arrays;

class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int possibleBeds = 0;
        int[] newFlowerBed = Arrays.copyOf(flowerbed, flowerbed.length);

        for (int i = 0; i < newFlowerBed.length; i++) {
            int left = 0;
            int mid = newFlowerBed[i];
            int right = 0;
            int l = newFlowerBed.length;
            
            // Handle first and last index
            if (i == 0) {
                if (mid == 0 && (i + 1 == l || newFlowerBed[i + 1] == 0)) {
                    possibleBeds++;
                    if (possibleBeds >= n) return true;
                    newFlowerBed[i] = 1;
                }
            } else if (i == l - 1) {
                if (mid == 0 && newFlowerBed[i - 1] == 0) {
                    possibleBeds++;
                    if (possibleBeds >= n) return true;
                    newFlowerBed[i] = 1;
                }
            } else {
                // Handle middle elements
                left = newFlowerBed[i - 1];
                right = newFlowerBed[i + 1];

                if (left == 0 && right == 0 && mid == 0) {
                    possibleBeds++;
                    if (possibleBeds >= n) return true;
                    newFlowerBed[i] = 1;
                }
            }

        }

        return false;
    }
}
// @lc code=end

