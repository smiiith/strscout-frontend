import { ScanEmailTemplate } from '@/components/email/scan-notification';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'SyncNanny <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'SyncNanny scan notification',
            react: ScanEmailTemplate({ firstName: 'Gil' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}