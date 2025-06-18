import type { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../../lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json');

  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return handleCreatePrayerRequest(req, res);
    case 'GET':
      return handleGetPrayerRequests(req, res);
    case 'PUT':
      return handleUpdatePrayerRequest(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT']);
      return res.status(405).json({ 
        error: `Method ${req.method} not allowed`,
        allowedMethods: ['POST', 'GET', 'PUT']
      });
  }
}

async function handleCreatePrayerRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ 
          error: 'Invalid JSON in request body',
          details: e instanceof Error ? e.message : 'Unknown error'
        });
      }
    }

    // Validate required fields
    if (!body.userId || !body.title || !body.content) {
      return res.status(400).json({ 
        error: 'userId, title, and content are required fields',
        requiredFields: ['userId', 'title', 'content']
      });
    }

    const { userId, title, content, isPrivate = true } = body;

    // Create prayer request
    const prayerRequest = await DatabaseService.createPrayerRequest({
      userId,
      title,
      content,
      isPrivate,
    });

    // Track usage analytics
    try {
      await DatabaseService.trackUsage({
        userId,
        action: 'prayer_request_created',
        details: {
          isPrivate,
          titleLength: title.length,
          contentLength: content.length,
        },
        userAgent: req.headers['user-agent'],
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      });
    } catch (error) {
      console.error('Error tracking usage:', error);
    }

    return res.status(201).json({ 
      success: true, 
      prayerRequest,
      message: 'Prayer request created successfully' 
    });

  } catch (error) {
    console.error('Error creating prayer request:', error);
    return res.status(500).json({ 
      error: 'Failed to create prayer request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleGetPrayerRequests(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, includePrivate = 'true' } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ 
        error: 'userId query parameter is required',
        requiredFields: ['userId']
      });
    }

    const includePrivateBool = includePrivate === 'true';

    const prayerRequests = await DatabaseService.getPrayerRequests(userId, includePrivateBool);

    return res.status(200).json({ 
      success: true, 
      prayerRequests,
      count: prayerRequests.length
    });

  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch prayer requests',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleUpdatePrayerRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ 
          error: 'Invalid JSON in request body',
          details: e instanceof Error ? e.message : 'Unknown error'
        });
      }
    }

    // Validate required fields
    if (!body.id) {
      return res.status(400).json({ 
        error: 'id is required for updating prayer request',
        requiredFields: ['id']
      });
    }

    const { id, isAnswered, title, content } = body;

    // Update prayer request
    const prayerRequest = await DatabaseService.updatePrayerRequest(id, {
      isAnswered,
      title,
      content,
    });

    // Track usage analytics
    try {
      await DatabaseService.trackUsage({
        userId: prayerRequest.userId,
        action: 'prayer_request_updated',
        details: {
          wasAnswered: isAnswered,
          hasTitleUpdate: !!title,
          hasContentUpdate: !!content,
        },
        userAgent: req.headers['user-agent'],
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      });
    } catch (error) {
      console.error('Error tracking usage:', error);
    }

    return res.status(200).json({ 
      success: true, 
      prayerRequest,
      message: 'Prayer request updated successfully' 
    });

  } catch (error) {
    console.error('Error updating prayer request:', error);
    return res.status(500).json({ 
      error: 'Failed to update prayer request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 