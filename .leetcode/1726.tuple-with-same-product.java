/*
 * @lc app=leetcode id=1726 lang=java
 *
 * [1726] Tuple with Same Product
 */

// @lc code=start

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

class Pair {
    int first;
    int second;
    
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    public int tupleSameProduct(int[] nums) {
        int numberOfTuples = 0;
        Map<Integer, List<Pair>> productOfPairs = new HashMap<>();

        // Find all possible pairs and their products
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                int product = nums[i] * nums[j];

                // Store the pair that makes this product
                productOfPairs.putIfAbsent(product, new ArrayList<>());
                productOfPairs.get(product).add(new Pair(nums[i], nums[j]));
            }
        }

        // for each product, check which are valid
        for (List<Pair> pairs : productOfPairs.values()) {
            // if we have more than one with the same product
            if (pairs.size() > 1) {
                // nC2 * 8: Choose 2 pairs from n pairs * 8 possible arrangements
                int size = pairs.size();
                numberOfTuples += (size * (size - 1) / 2) * 8;
            }
            
        }


        return numberOfTuples;
    }
}
// @lc code=end

