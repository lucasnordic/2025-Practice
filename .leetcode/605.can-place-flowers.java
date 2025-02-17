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
class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        // Handle edge cases
        if (flowerbed == null) {
            return false;
        }
        if (n == 0) {
            return true;
        }
        
        int placedFlowers = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            boolean isEmpty = flowerbed[i] == 0;
            boolean leftEmpty = (i == 0 || flowerbed[i - 1] == 0);
            boolean rightEmpty  = flowerbed.length - 1 == i || flowerbed[i + 1] == 0;

            if (isEmpty && leftEmpty && rightEmpty) {
                placedFlowers++;
                flowerbed[i] = 1;
                i++; // skip next position since we can't plant there
            }
  
            if (placedFlowers >= n) return true;
        }

        return placedFlowers >= n;
    }
}
// @lc code=end

