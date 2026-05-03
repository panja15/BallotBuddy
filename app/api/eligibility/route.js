// file: app/api/eligibility/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { age, citizenship, resident } = await req.json();

    // Mocking a database check or more complex validation
    // In a real scenario, this might check against electoral rolls (if allowed)
    
    let isEligible = true;
    let reasons = [];

    if (parseInt(age) < 18) {
      isEligible = false;
      reasons.push("Minimum age for voting is 18 years.");
    }

    if (citizenship !== 'yes') {
      isEligible = false;
      reasons.push("Voter registration is limited to Indian citizens.");
    }

    if (resident !== 'yes') {
      isEligible = false;
      reasons.push("Applicant must be an ordinary resident of the constituency.");
    }

    return NextResponse.json({
      eligible: isEligible,
      reasons: reasons.length > 0 ? reasons : ["All criteria met."],
      timestamp: new Date().toISOString(),
      source: "Election Commission of India (ECI) Mock Data"
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
