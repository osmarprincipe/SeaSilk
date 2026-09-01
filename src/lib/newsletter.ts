export interface NewsletterSubscribeResult {
  success: boolean;
  error?: string;
}

/**
 * Newsletter subscription — currently a mock that always succeeds after a
 * short delay. Swap the body of this function for a real provider call
 * (Mailchimp, Klaviyo, Resend, etc.) later; every caller only depends on
 * this function's signature, not on how it's implemented.
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  return { success: true };
}
