/*
 * @lc app=leetcode id=2342 lang=java
 *
 * [2342] Max Sum of a Pair With Equal Sum of Digits
 */

// @lc code=start
class Solution {
    public int maximumSum(int[] nums) {
        // Map of sums, 9 and a list of numbers getting the sum
        Map<Integer, List<Integer>> sumsMap = new HashMap<>();
        int maxSum = -1;

        // 1. find indexes
        for (int currentNum : nums) {
            int sum = getDigitSum(currentNum);
            sumsMap.putIfAbsent(sum, new ArrayList<>()); // new list if none exist
            sumsMap.get(sum).add(currentNum);
        }

        // 2. find the max sum of pairs with equal digit sum
        for (List<Integer> numbers : sumsMap.values()) {
            if(numbers.size() <= 1) continue;

            // we only want the two largest numbers
            Collections.sort(numbers, Collections.reverseOrder());
            int candidateSum = numbers.get(0) + numbers.get(1);
            maxSum = Math.max(candidateSum, maxSum);
        }

        return maxSum;
    }

    // helper function to get then digit sum of a number
    private int getDigitSum(int num) {
        String numStr = String.valueOf(num);
        int sum = 0;

        for (char c : numStr.toCharArray()) {
            sum += Character.getNumericValue(c);
        }

        return sum;
    }
}
// @lc code=end

