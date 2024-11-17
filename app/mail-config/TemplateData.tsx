import { Template } from '@/interfaces/mail-interfaces';
  
  export let templates: Template[] = [
    // {
    //   id: 'welcome',
    //   name: 'Welcome Email',
    //   description: 'Send to new subscribers',
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h1 style="color: #4F46E5; text-align: center; padding: 20px;">Welcome aboard! 👋</h1>
    //       <p style="color: #374151; line-height: 1.6;">
    //         We're excited to have you join our community! Here's what you can expect from us:
    //       </p>
    //       <ul style="color: #374151; line-height: 1.6;">
    //         <li>Weekly newsletters with the latest updates</li>
    //         <li>Exclusive content and offers</li>
    //         <li>Tips and best practices</li>
    //       </ul>
    //       <div style="text-align: center; padding: 20px;">
    //         <a href="#" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    //           Get Started
    //         </a>
    //       </div>
    //     </div>
    //   `
    // },
    // {
    //   id: 'newsletter',
    //   name: 'Monthly Newsletter',
    //   description: 'Regular updates for subscribers',
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h1 style="color: #4F46E5; text-align: center; padding: 20px;">Monthly Newsletter</h1>
    //       <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    //         <h2 style="color: #1F2937;">This Month's Highlights</h2>
    //         <ul style="color: #374151; line-height: 1.6;">
    //           <li>Feature Update: New Dashboard Design</li>
    //           <li>Community Spotlight: Meet Our Users</li>
    //           <li>Tips & Tricks: Productivity Hacks</li>
    //         </ul>
    //       </div>
    //       <div style="text-align: center; padding: 20px;">
    //         <a href="#" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
    //           Read More
    //         </a>
    //       </div>
    //     </div>
    //   `
    // },
    // {
    //   id: 'promotion',
    //   name: 'Special Offer',
    //   description: 'Promotional email template',
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <div style="background-color: #4F46E5; color: white; padding: 40px; text-align: center;">
    //         <h1 style="margin: 0;">Special Offer! 🎉</h1>
    //         <p style="font-size: 24px; margin: 10px 0;">Save 25% Today</p>
    //       </div>
    //       <div style="padding: 20px;">
    //         <p style="color: #374151; line-height: 1.6;">
    //           Don't miss out on this exclusive offer! For a limited time only, get 25% off on all premium features.
    //         </p>
    //         <div style="text-align: center; padding: 20px;">
    //           <a href="#" style="background-color: #DC2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
    //             Claim Offer
    //           </a>
    //         </div>
    //         <p style="color: #6B7280; font-size: 12px; text-align: center;">
    //           Offer valid until March 31st, 2024
    //         </p>
    //       </div>
    //     </div>
    //   `
    // }
  ];
  
  export const addTemplate = (template: Omit<Template, 'id'>) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString()
    };
    templates = [...templates, newTemplate];
    return newTemplate;
  };
  
  export const updateTemplate = (id: string, updates: Omit<Template, 'id'>) => {
    templates = templates.map(template => 
      template.id === id 
        ? { ...template, ...updates }
        : template
    );
  };