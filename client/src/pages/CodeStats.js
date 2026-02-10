import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiTrendingUp, FiAward, FiCalendar } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { social } from '../config/personalData';
import './CodeStats.css';

const CodeStats = () => {
    const [selectedYear, setSelectedYear] = useState('last-year');
    const [githubStats, setGithubStats] = useState(null);
    const [leetcodeStats, setLeetcodeStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Extract username from GitHub URL
    const githubUsername = social.github.split('github.com/')[1];
    const leetcodeUsername = social.leetcode.split('leetcode.com/')[1];

    // API base URL
    const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // Generate year options
    const currentYear = new Date().getFullYear();
    const years = [
        { value: 'last-year', label: 'Last Year' },
        { value: currentYear.toString(), label: currentYear },
        { value: (currentYear - 1).toString(), label: currentYear - 1 },
        { value: (currentYear - 2).toString(), label: currentYear - 2 },
        { value: (currentYear - 3).toString(), label: currentYear - 3 },
        { value: (currentYear - 4).toString(), label: currentYear - 4 },
        { value: (currentYear - 5).toString(), label: currentYear - 5 },
        { value: (currentYear - 6).toString(), label: currentYear - 6 },
    ];

    // Fetch GitHub stats
    useEffect(() => {
        const fetchGithubStats = async () => {
            try {
                const response = await fetch(`${API}/api/stats/github/${githubUsername}`);
                const data = await response.json();

                if (data.success) {
                    setGithubStats(data.data);
                } else {
                    console.error('Failed to fetch GitHub stats:', data.message);
                }
            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
            }
        };

        fetchGithubStats();
    }, [githubUsername]);

    // Fetch LeetCode stats
    useEffect(() => {
        const fetchLeetcodeStats = async () => {
            try {
                const response = await fetch(`${API}/api/stats/leetcode/${leetcodeUsername}`);
                const data = await response.json();

                if (data.success) {
                    setLeetcodeStats(data.data);
                } else {
                    console.error('Failed to fetch LeetCode stats:', data.message);
                }
            } catch (error) {
                console.error('Error fetching LeetCode stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeetcodeStats();
    }, [leetcodeUsername]);

    return (
        <div className="code-stats-page">
            <div className="container">

                {/* Page Header */}
                <motion.div
                    className="page-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Code Statistics</h1>
                    <p>My coding journey across platforms</p>
                </motion.div>

                {/* GitHub Stats Section */}
                <section className="stats-section github-section section">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-title">
                            <FiGithub className="section-icon" />
                            <h2>GitHub Activity</h2>
                        </div>
                        <a
                            href={social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link"
                        >
                            <FiGithub /> View GitHub Profile <FiExternalLink />
                        </a>
                    </motion.div>

                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        My contribution activity over the past year
                    </motion.p>

                    {/* Stats Summary Cards */}
                    <motion.div
                        className="stats-summary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="summary-card">
                            <FiTrendingUp className="summary-icon" />
                            <div className="summary-value">
                                {githubStats?.totalContributions || '...'}
                            </div>
                            <div className="summary-label">Total Contributions</div>
                        </div>

                        <div className="summary-card">
                            <FiCalendar className="summary-icon" />
                            <div className="summary-value">
                                {githubStats?.totalContributions ? Math.floor(githubStats.totalContributions / 7) : '...'}
                            </div>
                            <div className="summary-label">Active Days</div>
                        </div>

                        <div className="summary-card">
                            <FiAward className="summary-icon streak-icon" />
                            <div className="summary-value">
                                {githubStats?.currentStreak?.length || '0'}
                            </div>
                            <div className="summary-label">Current Streak</div>
                        </div>

                        <div className="summary-card">
                            <FiAward className="summary-icon longest-icon" />
                            <div className="summary-value">
                                {githubStats?.longestStreak?.length || '0'}
                            </div>
                            <div className="summary-label">Longest Streak</div>
                        </div>
                    </motion.div>

                    {/* Year Selector */}
                    {/* <motion.div
                        className="year-selector-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {years.map((year) => (
                            <button
                                key={year.value}
                                className={`year-tab ${selectedYear === year.value ? 'active' : ''}`}
                                onClick={() => setSelectedYear(year.value)}
                            >
                                {year.label}
                            </button>
                        ))}
                    </motion.div> */}

                    {/* Contribution Activity Graph */}
                    <motion.div
                        className="contribution-graph"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>Contribution Activity {selectedYear !== 'last-year' ? `(${selectedYear})` : '(Last Year)'}</h3>
                        <div className="graph-container">
                            {selectedYear === 'last-year' ? (
                                <img
                                    key="last-year"
                                    src={`https://ghchart.rshah.org/58a6ff/${githubUsername}`}
                                    alt="GitHub Contribution Graph"
                                />
                            ) : (
                                <img
                                    key={selectedYear}
                                    src={`https://ghchart.rshah.org/${selectedYear}/58a6ff/${githubUsername}`}
                                    alt="GitHub Contribution Graph"
                                />
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* LeetCode Stats Section */}
                <section className="stats-section leetcode-section section">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-title">
                            <SiLeetcode className="section-icon leetcode-icon" />
                            <h2>LeetCode Stats</h2>
                        </div>
                        <a
                            href={social.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-link leetcode-link"
                        >
                            <SiLeetcode /> View LeetCode Profile <FiExternalLink />
                        </a>
                    </motion.div>

                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        My problem solving journey on LeetCode
                    </motion.p>

                    {/* LeetCode Stats Cards */}
                    <motion.div
                        className="leetcode-stats-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="leetcode-stat-card total-card">
                            <div className="leetcode-icon-wrapper">
                                <FiAward className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.totalSolved || '0')}
                            </div>
                            <div className="leetcode-stat-label">Total Solved</div>
                        </div>

                        <div className="leetcode-stat-card easy-card">
                            <div className="leetcode-icon-wrapper">
                                <FiCode className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.easySolved || '0')}
                            </div>
                            <div className="leetcode-stat-label">Easy Problems</div>
                        </div>

                        <div className="leetcode-stat-card medium-card">
                            <div className="leetcode-icon-wrapper">
                                <FiCode className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.mediumSolved || '0')}
                            </div>
                            <div className="leetcode-stat-label">Medium Problems</div>
                        </div>

                        <div className="leetcode-stat-card hard-card">
                            <div className="leetcode-icon-wrapper">
                                <FiCode className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.hardSolved || '0')}
                            </div>
                            <div className="leetcode-stat-label">Hard Problems</div>
                        </div>

                        <div className="leetcode-stat-card ranking-card">
                            <div className="leetcode-icon-wrapper">
                                <FiTrendingUp className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.ranking ? leetcodeStats.ranking.toLocaleString() : '0')}
                            </div>
                            <div className="leetcode-stat-label">Ranking</div>
                        </div>

                        <div className="leetcode-stat-card reputation-card">
                            <div className="leetcode-icon-wrapper">
                                <FiAward className="leetcode-card-icon" />
                            </div>
                            <div className="leetcode-stat-value">
                                {loading ? '...' : (leetcodeStats?.reputation || '0')}
                            </div>
                            <div className="leetcode-stat-label">Reputation</div>
                        </div>
                    </motion.div>
                </section >

                {/* Info Note */}
                < motion.div
                    className="stats-note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>
                        📊 Statistics are fetched in real-time from GitHub and LeetCode via backend API.
                    </p>
                </motion.div >

            </div >
        </div >
    );
};

export default CodeStats;
