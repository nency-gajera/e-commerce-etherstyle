import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Helper function to format timestamp as DD/MM/YYYY
export const formatDateString = (timestamp) => {
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Sends a beautiful HTML order confirmation email to the customer
 * with inline CID image attachments so images display 100% in Gmail
 */
export const sendOrderConfirmationEmail = async (orderData) => {
    try {
        const recipientEmail = orderData.address?.email;
        if (!recipientEmail) {
            console.log("⚠️ No recipient email provided in order data.");
            return;
        }

        const orderDateStr = formatDateString(orderData.date);
        const deliveryDateStr = formatDateString(orderData.deliveryDate);
        const customerName = `${orderData.address?.firstName || 'Valued'} ${orderData.address?.lastName || 'Customer'}`.trim();

        // Build inline attachments array and HTML items rows
        const attachments = [];
        const items = orderData.items || [];

        const itemsHtml = items.map((item, index) => {
            let imgSrc = 'https://via.placeholder.com/80';
            const originalImg = item.image && item.image[0] ? item.image[0] : '';

            if (originalImg) {
                if (originalImg.startsWith('http://') || originalImg.startsWith('https://')) {
                    if (originalImg.includes('localhost:') || originalImg.includes('127.0.0.1')) {
                        // Localhost URL: resolve to disk file in uploads directory for inline CID attachment
                        const filename = path.basename(originalImg);
                        const localPath = path.join(process.cwd(), 'uploads', filename);

                        if (fs.existsSync(localPath)) {
                            const cidName = `product_img_${index}_${Date.now()}`;
                            attachments.push({
                                filename: filename,
                                path: localPath,
                                cid: cidName
                            });
                            imgSrc = `cid:${cidName}`;
                        } else {
                            imgSrc = originalImg;
                        }
                    } else {
                        // External HTTPS URL (Cloudinary / Unsplash)
                        imgSrc = originalImg;
                    }
                } else {
                    // Relative file path (e.g. /uploads/filename.png or uploads/filename.png)
                    const filename = path.basename(originalImg);
                    const localPath = path.join(process.cwd(), 'uploads', filename);

                    if (fs.existsSync(localPath)) {
                        const cidName = `product_img_${index}_${Date.now()}`;
                        attachments.push({
                            filename: filename,
                            path: localPath,
                            cid: cidName
                        });
                        imgSrc = `cid:${cidName}`;
                    }
                }
            }

            return `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: center;">
                    <img src="${imgSrc}" alt="${item.name}" style="width: 60px; height: 75px; object-fit: cover; border-radius: 6px; border: 1px solid #eaedd0;" />
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-family: sans-serif; font-size: 14px; color: #111111;">
                    <strong>${item.name}</strong><br/>
                    <span style="font-size: 12px; color: #666666;">Size: <strong>${item.size || 'N/A'}</strong> | Qty: ${item.quantity || 1}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-family: sans-serif; font-size: 14px; color: #111111; text-align: right; font-weight: bold;">
                    ₹${(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                </td>
            </tr>
            `;
        }).join('');

        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Confirmation - Etherstyle</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f6; padding: 20px 0;">
                <tr>
                    <td align="center">
                        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                            
                            <!-- Header Banner -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #111827 0%, #000000 100%); padding: 35px 30px; text-align: center;">
                                    <h1 style="color: #ffffff; font-family: 'Georgia', serif; font-size: 28px; margin: 0; letter-spacing: 2px;">ETHERSTYLE</h1>
                                    <p style="color: #f43f5e; font-size: 11px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; margin-top: 6px; margin-bottom: 0;">PREMIER LUXURY FASHION</p>
                                </td>
                            </tr>

                            <!-- Body Content -->
                            <tr>
                                <td style="padding: 30px;">
                                    <h2 style="font-size: 20px; color: #111827; margin-top: 0; margin-bottom: 8px;">Thank You For Your Order, ${customerName}!</h2>
                                    <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin-top: 0; margin-bottom: 24px;">
                                        We have received your order and our team is preparing it for shipment. Below are your order details and delivery timeline.
                                    </p>

                                    <!-- Order & Delivery Date Highlight Card -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff1f2; border: 1px solid #ffe4e6; border-radius: 12px; margin-bottom: 24px;">
                                        <tr>
                                            <td style="padding: 16px; text-align: center; width: 50%; border-right: 1px solid #ffe4e6;">
                                                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9f1239; font-weight: bold; display: block; margin-bottom: 4px;">ORDER DATE</span>
                                                <strong style="font-size: 16px; color: #881337;">${orderDateStr}</strong>
                                            </td>
                                            <td style="padding: 16px; text-align: center; width: 50%;">
                                                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9f1239; font-weight: bold; display: block; margin-bottom: 4px;">ESTIMATED DELIVERY DATE</span>
                                                <strong style="font-size: 16px; color: #e11d48;">${deliveryDateStr}</strong>
                                                <span style="font-size: 10px; color: #be123c; display: block; margin-top: 2px;">(Delivering within 5 days)</span>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Product List -->
                                    <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #111827; margin-bottom: 12px; border-bottom: 2px solid #111827; padding-bottom: 6px;">ORDER ITEMS</h3>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                        ${itemsHtml}
                                    </table>

                                    <!-- Order Summary & Shipping Address -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                                        <tr>
                                            <td width="50%" valign="top" style="padding-right: 12px;">
                                                <h4 style="font-size: 12px; text-transform: uppercase; color: #6b7280; margin: 0 0 6px 0;">SHIPPING ADDRESS</h4>
                                                <p style="font-size: 13px; color: #111827; line-height: 1.5; margin: 0;">
                                                    <strong>${customerName}</strong><br/>
                                                    ${orderData.address?.street || ''}, ${orderData.address?.city || ''}<br/>
                                                    ${orderData.address?.state || ''}, ${orderData.address?.zipcode || ''}<br/>
                                                    Phone: ${orderData.address?.phone || 'N/A'}
                                                </p>
                                            </td>
                                            <td width="50%" valign="top" style="padding-left: 12px; background-color: #f9fafb; padding: 14px; border-radius: 8px;">
                                                <h4 style="font-size: 12px; text-transform: uppercase; color: #6b7280; margin: 0 0 6px 0;">PAYMENT SUMMARY</h4>
                                                <p style="font-size: 13px; color: #111827; margin: 0 0 4px 0;">Method: <strong>${orderData.paymentMethod || 'COD'}</strong></p>
                                                <p style="font-size: 15px; color: #111827; font-weight: bold; margin: 8px 0 0 0; border-t: 1px solid #e5e7eb; padding-top: 6px;">
                                                    Total Paid: ₹${(orderData.amount || 0).toLocaleString('en-IN')}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="text-align: center; border-t: 1px solid #e5e7eb; padding-top: 20px;">
                                        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                                            If you have any questions regarding your order, contact our support team at support@etherstyle.com
                                        </p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #111827; padding: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
                                    &copy; ${new Date().getFullYear()} Etherstyle. All rights reserved.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        const user = process.env.SMTP_USER || process.env.EMAIL_USER;
        const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

        let transporter;
        if (user && rawPass) {
            const cleanPass = rawPass.trim().replace(/[\s-]/g, '');
            const cleanUser = user.trim();

            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: cleanUser,
                    pass: cleanPass
                }
            });

            const plainTextSummary = `Thank you for your order with Etherstyle, ${customerName}!\n\nOrder Date: ${orderDateStr}\nEstimated Delivery Date: ${deliveryDateStr} (Within 5 days)\nTotal Amount: ₹${(orderData.amount || 0).toLocaleString('en-IN')}\n\nThank you for shopping at Etherstyle!`;

            const mailOptions = {
                from: `"Etherstyle" <${cleanUser}>`,
                to: recipientEmail,
                replyTo: cleanUser,
                subject: `Order Confirmation - Etherstyle (Est. Delivery: ${deliveryDateStr})`,
                text: plainTextSummary,
                html: htmlTemplate,
                attachments: attachments
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ Real Gmail confirmation email with CID images sent to ${recipientEmail}:`, info.messageId || info.response);

        } else {
            // Auto test account with live web preview link
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });

            const mailOptions = {
                from: `"Etherstyle Orders" <orders@etherstyle.com>`,
                to: recipientEmail,
                subject: `🎉 Order Confirmed! (Est. Delivery: ${deliveryDateStr}) - Etherstyle`,
                html: htmlTemplate,
                attachments: attachments
            };

            const info = await transporter.sendMail(mailOptions);
            const previewUrl = nodemailer.getTestMessageUrl(info);
            console.log(`\n======================================================`);
            console.log(`📧 ORDER CONFIRMATION EMAIL SENT TO: ${recipientEmail}`);
            console.log(`🔗 VIEW RENDERED EMAIL PREVIEW HERE: ${previewUrl}`);
            console.log(`======================================================\n`);
        }

    } catch (error) {
        console.error("❌ Order confirmation email notice:", error.message);
    }
};
