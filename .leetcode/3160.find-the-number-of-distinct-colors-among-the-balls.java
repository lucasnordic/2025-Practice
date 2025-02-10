/*
 * @lc app=leetcode id=3160 lang=java
 *
 * [3160] Find the Number of Distinct Colors Among the Balls
 */

// @lc code=start
/*
 * Input:   limit = 4, 
 * queries = 
 * [
 * [1,4],
 * [2,5],
 * [1,3],
 * [3,4]
 * ]
 * 
 * Output:  [1,2,2,3]
 * 
 * 3, 
 * 
        int[] result = new int[queries.length];
        vs
        int[] result = {queries.length};
 * 
 */

import java.util.HashMap;

class Solution {
    HashMap<Integer,Integer> ballToColor = new HashMap<>();    // store balls and their color
    HashMap<Integer, Integer> colorToCount = new HashMap<>();  // store colors and the count
    int distinctColors = 0;                          

    public int[] queryResults(int limit, int[][] queries) {
        int[] result = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {
            updateBallColor(queries[i][0], queries[i][1]);
            result[i] = distinctColors;
        }

        return result; 
    }

    private void updateBallColor(int ball, int newColor) {
        if (ballToColor.containsKey(ball)) {                    // if I have the ball
            int prevColor = ballToColor.get(ball);              // get the balls color
            if (prevColor != newColor) {                        // if it is diff from new
                removeColor(prevColor);                         // remove it
                addColor(ball, newColor);                       // add new
            }
        } else {                                                // if not
            addColor(ball, newColor);                           // add new
        }
    }
    
    private void removeColor(int color) {      
        colorToCount.put(color, colorToCount.get(color) - 1);
        if (colorToCount.get(color) == 0) {
            distinctColors--;                          
        }
    }

    private void addColor(int ball, int color) {
        colorToCount.put(color, colorToCount.getOrDefault(color, 0) + 1);
        if (colorToCount.get(color) == 1) {    
            distinctColors++;          
        }
        ballToColor.put(ball, color);
    }
}
// @lc code=end

