import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.unitNumber || !data.contactNumber || !data.email || !data.serviceType || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Store the maintenance request in a database
    // 2. Send notification to maintenance team
    // 3. Send confirmation email to resident
    // 4. Create a ticket in your maintenance system
    
    // For now, we'll simulate a successful submission
    return NextResponse.json(
      { 
        success: true,
        message: 'Maintenance request submitted successfully',
        requestId: Math.random().toString(36).substring(7)
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit maintenance request' },
      { status: 500 }
    );
  }
} 