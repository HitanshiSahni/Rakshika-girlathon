'use client';

// Advanced AI Threat Detection Models
// Comprehensive pattern matching for harassment, abuse, and cyberstalking

export class ThreatDetectionAI {
  constructor() {
    // Explicit sexual harassment patterns
    this.sexualHarassmentPatterns = [
      /fuck\s+you?/i, /wanna\s+fuck/i, /want\s+to\s+fuck/i, /fucking/i, /f\*ck/i,
      /send\s+nudes?/i, /nude\s+pic/i, /naked\s+pic/i, /show\s+me\s+your/i,
      /dick\s+pic/i, /penis/i, /vagina/i, /pussy/i, /tits/i, /boobs/i, /breast/i,
      /sex\s+with/i, /have\s+sex/i, /make\s+love/i, /sleep\s+with/i,
      /suck\s+my/i, /blow\s+job/i, /oral\s+sex/i, /masturbate/i,
      /horny/i, /turned\s+on/i, /sexy\s+time/i, /get\s+naked/i,
      /strip\s+for/i, /undress/i, /take\s+off/i, /remove\s+your/i,
      /phone\s+sex/i, /video\s+call/i, /cam\s+sex/i, /private\s+show/i
    ];

    // Contact solicitation patterns
    this.contactSolicitationPatterns = [
      /give\s+me\s+your?\s+number/i, /send\s+your?\s+number/i, /what's\s+your?\s+number/i,
      /phone\s+number/i, /mobile\s+number/i, /contact\s+number/i,
      /whatsapp\s+number/i, /telegram/i, /signal/i, /snapchat/i,
      /meet\s+me/i, /meet\s+up/i, /hang\s+out/i, /come\s+over/i,
      /my\s+place/i, /your\s+place/i, /private\s+chat/i, /offline/i,
      /real\s+life/i, /in\s+person/i, /face\s+to\s+face/i
    ];

    // Abusive and threatening patterns
    this.abusivePatterns = [
      /kill\s+you/i, /murder/i, /hurt\s+you/i, /beat\s+you/i, /rape/i, /die/i, /death/i,
      /slut/i, /whore/i, /bitch/i, /cunt/i, /stupid\s+bitch/i, /dumb\s+slut/i,
      /ugly/i, /fat\s+bitch/i, /worthless/i, /pathetic/i, /loser/i, /idiot/i,
      /shut\s+up/i, /go\s+die/i, /kill\s+yourself/i, /hate\s+you/i,
      /deserve\s+to\s+die/i, /wish\s+you\s+were\s+dead/i, /piece\s+of\s+shit/i
    ];

    // Stalking and obsessive patterns
    this.stalkingPatterns = [
      /stalk/i, /follow\s+you/i, /watching\s+you/i, /know\s+where\s+you\s+live/i,
      /know\s+where\s+you\s+work/i, /know\s+your\s+address/i, /found\s+your/i,
      /tracked\s+you/i, /see\s+you\s+everywhere/i, /can't\s+stop\s+thinking/i,
      /obsessed\s+with/i, /drive\s+by\s+your/i, /outside\s+your/i,
      /following\s+your/i, /monitoring/i, /surveillance/i, /spy\s+on/i,
      /recorded\s+you/i, /photos\s+of\s+you/i, /video\s+of\s+you/i
    ];

    // Manipulation and coercion patterns
    this.manipulationPatterns = [
      /don't\s+tell\s+anyone/i, /keep\s+it\s+secret/i, /between\s+us/i,
      /no\s+one\s+will\s+believe/i, /your\s+fault/i, /you\s+asked\s+for/i,
      /owe\s+me/i, /you\s+have\s+to/i, /must\s+do/i, /force\s+you/i,
      /blackmail/i, /expose\s+you/i, /tell\s+everyone/i, /ruin\s+your/i,
      /destroy\s+your/i, /consequences/i, /regret\s+it/i
    ];

    // Cyberstalking social media patterns
    this.cyberstalkingPatterns = [
      /saw\s+your\s+story/i, /noticed\s+your\s+post/i, /liked\s+all\s+your/i,
      /going\s+through\s+your/i, /stalking\s+your\s+profile/i, /creeping\s+on/i,
      /screenshots/i, /saved\s+your\s+pics/i, /downloaded\s+your/i,
      /reverse\s+image\s+search/i, /found\s+your\s+other\s+accounts/i,
      /your\s+instagram/i, /your\s+facebook/i, /your\s+twitter/i, /your\s+tiktok/i,
      /tagged\s+location/i, /check\s+in/i, /where\s+you\s+were/i
    ];

    // Grooming patterns
    this.groomingPatterns = [
      /special\s+girl/i, /chosen\s+one/i, /mature\s+for\s+your\s+age/i,
      /secret\s+relationship/i, /no\s+one\s+understands/i, /trust\s+me/i,
      /I\s+love\s+you/i, /you're\s+different/i, /teach\s+you/i, /show\s+you/i,
      /experience/i, /first\s+time/i, /innocent/i, /pure/i, /virgin/i
    ];

    // Threat intensity multipliers
    this.intensityMultipliers = [
      /tonight/i, /right\s+now/i, /immediately/i, /asap/i, /urgent/i,
      /can't\s+wait/i, /dying\s+to/i, /desperate/i, /need\s+you\s+now/i,
      /final\s+warning/i, /last\s+chance/i, /time\s+is\s+up/i
    ];
  }

  // Enhanced threat detection with multiple pattern matching
  detectThreat(message, context = {}) {
    const text = message.toLowerCase();
    const result = {
      isThreat: false,
      severity: 'low',
      type: 'none',
      confidence: 0,
      patterns: [],
      flags: [],
      categories: []
    };

    let maxConfidence = 0;
    let primaryType = 'none';

    // Check sexual harassment (highest priority)
    const sexualMatches = this.checkPatterns(text, this.sexualHarassmentPatterns);
    if (sexualMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('sexual_harassment');
      const confidence = 0.85 + (sexualMatches.length * 0.05);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'sexual_harassment';
      }
      result.patterns.push(...sexualMatches);
      result.flags.push('explicit_sexual_content');
    }

    // Check contact solicitation
    const contactMatches = this.checkPatterns(text, this.contactSolicitationPatterns);
    if (contactMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('contact_solicitation');
      const confidence = 0.7 + (contactMatches.length * 0.1);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'contact_solicitation';
      }
      result.patterns.push(...contactMatches);
      result.flags.push('requesting_personal_info');
    }

    // Check abusive language
    const abusiveMatches = this.checkPatterns(text, this.abusivePatterns);
    if (abusiveMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('abusive_language');
      const confidence = 0.8 + (abusiveMatches.length * 0.08);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'abusive_language';
      }
      result.patterns.push(...abusiveMatches);
      result.flags.push('threatening_language');
    }

    // Check stalking patterns
    const stalkingMatches = this.checkPatterns(text, this.stalkingPatterns);
    if (stalkingMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('stalking');
      const confidence = 0.9 + (stalkingMatches.length * 0.05);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'stalking';
      }
      result.patterns.push(...stalkingMatches);
      result.flags.push('stalking_behavior');
    }

    // Check manipulation patterns
    const manipulationMatches = this.checkPatterns(text, this.manipulationPatterns);
    if (manipulationMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('manipulation');
      const confidence = 0.75 + (manipulationMatches.length * 0.1);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'manipulation';
      }
      result.patterns.push(...manipulationMatches);
      result.flags.push('manipulation_attempt');
    }

    // Check cyberstalking
    const cyberstalkingMatches = this.checkPatterns(text, this.cyberstalkingPatterns);
    if (cyberstalkingMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('cyberstalking');
      const confidence = 0.6 + (cyberstalkingMatches.length * 0.15);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'cyberstalking';
      }
      result.patterns.push(...cyberstalkingMatches);
      result.flags.push('social_media_stalking');
    }

    // Check grooming patterns
    const groomingMatches = this.checkPatterns(text, this.groomingPatterns);
    if (groomingMatches.length > 0) {
      result.isThreat = true;
      result.categories.push('grooming');
      const confidence = 0.8 + (groomingMatches.length * 0.1);
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        primaryType = 'grooming';
      }
      result.patterns.push(...groomingMatches);
      result.flags.push('potential_grooming');
    }

    // Check intensity multipliers
    const intensityMatches = this.checkPatterns(text, this.intensityMultipliers);
    if (intensityMatches.length > 0 && result.isThreat) {
      maxConfidence = Math.min(0.95, maxConfidence + 0.1);
      result.flags.push('urgent_threat');
    }

    // Context analysis
    if (context.sender) {
      // Unknown sender increases threat level
      if (context.sender.includes('unknown') || context.sender.includes('private') || context.sender.includes('anonymous')) {
        result.flags.push('unknown_sender');
        maxConfidence = Math.min(0.95, maxConfidence + 0.1);
      }
      
      // Fake profile patterns
      if (context.sender.includes('fake') || /\d{3,}$/.test(context.sender)) {
        result.flags.push('suspicious_profile');
        maxConfidence = Math.min(0.95, maxConfidence + 0.05);
      }
    }

    // Repeated messages
    if (context.isRepeated) {
      result.flags.push('repeated_harassment');
      maxConfidence = Math.min(0.95, maxConfidence + 0.15);
    }

    // Time-based analysis
    if (context.timestamp) {
      const hour = new Date(context.timestamp).getHours();
      if (hour < 6 || hour > 22) {
        result.flags.push('unusual_time');
        maxConfidence = Math.min(0.95, maxConfidence + 0.05);
      }
    }

    // Set final values
    result.confidence = maxConfidence;
    result.type = primaryType;

    // Determine severity based on confidence and type
    if (result.confidence >= 0.8 || primaryType === 'stalking' || primaryType === 'sexual_harassment') {
      result.severity = 'high';
    } else if (result.confidence >= 0.5 || result.categories.length >= 2) {
      result.severity = 'medium';
    } else if (result.isThreat) {
      result.severity = 'low';
    }

    return result;
  }

  checkPatterns(text, patterns) {
    const matches = [];
    patterns.forEach(pattern => {
      if (pattern.test(text)) {
        matches.push(pattern.source.replace(/[\/\\]/g, ''));
      }
    });
    return matches;
  }

  // Enhanced social activity analysis
  analyzeSocialActivity(activities) {
    const flags = [];
    const user_activities = {};

    activities.forEach(activity => {
      const user = activity.user;
      if (!user_activities[user]) {
        user_activities[user] = {
          story_views: 0,
          likes: 0,
          comments: 0,
          old_posts: 0,
          timespan: new Set(),
          suspicious_patterns: []
        };
      }

      const userActivity = user_activities[user];
      
      switch (activity.type) {
        case 'story_view':
          userActivity.story_views++;
          break;
        case 'like':
          userActivity.likes++;
          if (activity.post_age_days > 30) {
            userActivity.old_posts++;
          }
          break;
        case 'comment':
          userActivity.comments++;
          break;
      }
      
      userActivity.timespan.add(activity.date);
    });

    // Analyze each user's activity
    Object.entries(user_activities).forEach(([user, activity]) => {
      const risk = this.calculateSocialRisk(activity);
      if (risk.level !== 'low') {
        flags.push({
          user,
          risk: risk.level,
          reasons: risk.reasons,
          activity,
          confidence: risk.confidence
        });
      }
    });

    return flags;
  }

  calculateSocialRisk(activity) {
    const reasons = [];
    let riskScore = 0;
    let confidence = 0;

    // Story view analysis (very suspicious)
    if (activity.story_views > 15) {
      reasons.push(`Viewed stories ${activity.story_views} times (obsessive behavior)`);
      riskScore += 4;
      confidence += 0.3;
    } else if (activity.story_views > 8) {
      reasons.push(`Viewed stories ${activity.story_views} times (concerning)`);
      riskScore += 2;
      confidence += 0.2;
    }

    // Excessive likes (mass liking)
    if (activity.likes > 25) {
      reasons.push(`Mass liked ${activity.likes} posts (stalking pattern)`);
      riskScore += 3;
      confidence += 0.25;
    } else if (activity.likes > 15) {
      reasons.push(`Liked ${activity.likes} posts (suspicious activity)`);
      riskScore += 2;
      confidence += 0.15;
    }

    // Old post interactions (deep stalking)
    if (activity.old_posts > 8) {
      reasons.push(`Deep stalking: ${activity.old_posts} old posts`);
      riskScore += 4;
      confidence += 0.35;
    } else if (activity.old_posts > 3) {
      reasons.push(`Viewed ${activity.old_posts} old posts`);
      riskScore += 2;
      confidence += 0.2;
    }

    // Time span analysis (binge stalking)
    if (activity.timespan.size === 1 && (activity.likes > 8 || activity.story_views > 5)) {
      reasons.push('Binge stalking: All activity in single session');
      riskScore += 3;
      confidence += 0.3;
    }

    // Multiple interaction types
    const interactionTypes = [
      activity.story_views > 0,
      activity.likes > 0,
      activity.comments > 0
    ].filter(Boolean).length;

    if (interactionTypes >= 2 && riskScore > 0) {
      reasons.push('Multiple interaction types (comprehensive stalking)');
      riskScore += 2;
      confidence += 0.2;
    }

    // Determine risk level
    let level = 'low';
    if (riskScore >= 8) {
      level = 'high';
    } else if (riskScore >= 4) {
      level = 'medium';
    }

    return { 
      level, 
      reasons, 
      score: riskScore, 
      confidence: Math.min(0.95, confidence) 
    };
  }

  // Enhanced fake account detection
  detectFakeAccount(profile) {
    const flags = [];
    let riskScore = 0;
    let confidence = 0;

    // Profile picture analysis
    if (!profile.profilePicture || profile.profilePicture.includes('default') || profile.profilePicture.includes('blank')) {
      flags.push('No profile picture or default image');
      riskScore += 3;
      confidence += 0.2;
    }

    // Bio analysis
    if (!profile.bio || profile.bio.length < 5) {
      flags.push('Empty or minimal bio');
      riskScore += 2;
      confidence += 0.15;
    }

    // Account age (newer accounts more suspicious)
    const accountAge = (Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (accountAge < 7) {
      flags.push('Very new account (less than 1 week)');
      riskScore += 4;
      confidence += 0.3;
    } else if (accountAge < 30) {
      flags.push('Recently created account (less than 1 month)');
      riskScore += 2;
      confidence += 0.2;
    }

    // Following/Follower ratio analysis
    const followingRatio = profile.following / Math.max(profile.followers, 1);
    if (followingRatio > 10) {
      flags.push('Following many, almost no followers (bot pattern)');
      riskScore += 3;
      confidence += 0.25;
    } else if (followingRatio > 5) {
      flags.push('Suspicious following/follower ratio');
      riskScore += 2;
      confidence += 0.15;
    }

    // Post activity analysis
    if (profile.posts === 0) {
      flags.push('No posts (throwaway account)');
      riskScore += 3;
      confidence += 0.2;
    } else if (profile.posts < 3) {
      flags.push('Very few posts');
      riskScore += 2;
      confidence += 0.1;
    }

    // Username pattern analysis
    if (/\d{4,}$/.test(profile.username)) {
      flags.push('Username ends with many numbers (auto-generated)');
      riskScore += 2;
      confidence += 0.15;
    }
    
    if (profile.username.includes('_user_') || profile.username.includes('fake') || profile.username.includes('temp')) {
      flags.push('Suspicious username patterns');
      riskScore += 3;
      confidence += 0.2;
    }

    // Verification status
    if (profile.isVerified === false && riskScore > 0) {
      riskScore += 1;
      confidence += 0.05;
    }

    // Determine final risk level
    let riskLevel = 'low';
    if (riskScore >= 8) {
      riskLevel = 'high';
      confidence = Math.min(0.9, confidence + 0.1);
    } else if (riskScore >= 4) {
      riskLevel = 'medium';
    }

    return {
      isFake: riskScore >= 4,
      riskLevel,
      flags,
      score: riskScore,
      confidence: Math.min(0.95, confidence)
    };
  }
}

export const threatAI = new ThreatDetectionAI();