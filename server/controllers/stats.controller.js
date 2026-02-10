const axios = require('axios');

// GitHub Stats Controller
exports.getGitHubStats = async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch GitHub streak stats
        const streakResponse = await axios.get(
            `https://github-readme-streak-stats.herokuapp.com/?user=${username}&type=json`
        );

        res.status(200).json({
            success: true,
            data: streakResponse.data
        });
    } catch (error) {
        console.error('Error fetching GitHub stats:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch GitHub stats',
            error: error.message
        });
    }
};

// LeetCode Stats Controller
exports.getLeetCodeStats = async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch LeetCode stats using GraphQL
        const response = await axios.post('https://leetcode.com/graphql', {
            query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
              reputation
            }
          }
        }
      `,
            variables: {
                username: username
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            }
        });

        if (response.data && response.data.data && response.data.data.matchedUser) {
            const user = response.data.data.matchedUser;
            const submissions = user.submitStats.acSubmissionNum;

            const stats = {
                totalSolved: submissions.find(s => s.difficulty === 'All')?.count || 0,
                easySolved: submissions.find(s => s.difficulty === 'Easy')?.count || 0,
                mediumSolved: submissions.find(s => s.difficulty === 'Medium')?.count || 0,
                hardSolved: submissions.find(s => s.difficulty === 'Hard')?.count || 0,
                ranking: user.profile.ranking || 0,
                reputation: user.profile.reputation || 0
            };

            res.status(200).json({
                success: true,
                data: stats
            });
        } else {
            throw new Error('User not found or invalid response');
        }
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch LeetCode stats',
            error: error.message
        });
    }
};
