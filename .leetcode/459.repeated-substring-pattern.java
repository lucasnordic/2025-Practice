/*
 * @lc app=leetcode id=459 lang=java
 *
 * [459] Repeated Substring Pattern
 */

// @lc code=start
/*
 * 
 */
class Solution {
    public boolean repeatedSubstringPattern(String s) {
        int n = s.length();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < n/2; i++) {        
            sb.append(s.charAt(i));            

            if (n % sb.length() == 0) {
                String repeated = sb.toString().repeat(n/sb.length());
                if( repeated.equals(s)) return true;   
            }
        }

        return false;
    }
}
// @lc code=end

