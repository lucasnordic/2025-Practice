/*
 * @lc app=leetcode id=1079 lang=java
 *
 * [1079] Letter Tile Possibilities
 */

// @lc code=start
class Solution {
    Set<String> sequences = new HashSet<>();

    public int numTilePossibilities(String tiles) {
        boolean[] used = new boolean[tiles.length()];

        generateSequences(tiles, "" , used);

        return sequences.size() - 1;
    }

    private void generateSequences(String tiles, String currentSequence, boolean[] used) {
        sequences.add(currentSequence);

        for (int i = 0; i < tiles.length(); i++) {
            if (!used[i]) {
                used[i] = true;
                generateSequences(tiles, currentSequence + tiles.charAt(i), used);
                used[i] = false;
            }
        }
    }
}
// @lc code=end

