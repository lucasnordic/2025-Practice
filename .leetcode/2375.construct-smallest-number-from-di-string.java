/*
 * @lc app=leetcode id=2375 lang=java
 *
 * [2375] Construct Smallest Number From DI String
 */

// @lc code=start
class Solution {
    HashSet<Integer> usedDigits = new HashSet<Integer>();
    public String smallestNumber(String pattern) {
        StringBuilder result = new StringBuilder();
        Stack<Integer> numStack = new Stack<>();
        int n = pattern.length();

        // for the length of the pattern
        for (int i = 0; i <= n; i++) {
            numStack.push(i + 1);
            
            // if 'I' or at end, pop stack elements
            if (i == n || pattern.charAt(i) == 'I') {
                while (!numStack.isEmpty()) {
                    result.append(numStack.pop());
                }
            }
        }
        return result.toString();
    }
}
// @lc code=end

