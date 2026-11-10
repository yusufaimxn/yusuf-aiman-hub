const iconBase = '/assets/applications/icons';

const application = (slug, name, fileName, description, category) => ({
  id: slug,
  slug,
  name,
  description,
  logo: `${iconBase}/${fileName}`,
  category,
  status: 'coming-soon',
});

export const applications = [
  application('omni-academy', 'Omni Academy', 'omni academy.png', 'A space for structured learning and useful knowledge.', 'Learning'),
  application('omni-account', 'Omni Account', 'omni account.png', 'A central space for account access and settings.', 'Utilities'),
  application('omni-ai', 'Omni AI', 'omni AI.png', 'AI powered tools for everyday work and ideas.', 'AI and Automation'),
  application('omni-beat', 'Omni Beat', 'omni beat.png', 'A focused space for rhythm, audio and creative practice.', 'Creativity and Design'),
  application('omni-business', 'Omni Business', 'omni business.png', 'Tools for organising business work and information.', 'Business'),
  application('omni-chat', 'Omni Chat', 'omni chat.png', 'A simple space for conversations and messages.', 'Communication'),
  application('omni-code', 'Omni Code', 'omni code.png', 'A workspace for writing and organising code.', 'AI and Automation'),
  application('omni-create', 'Omni Create', 'omni create.png', 'A space for making and developing ideas.', 'Creativity and Design'),
  application('omni-data', 'Omni Data', 'omni data.png', 'A workspace for viewing and organising data.', 'Data and Documents'),
  application('omni-design', 'Omni Design', 'omni design.png', 'Tools for visual design and creative work.', 'Creativity and Design'),
  application('omni-docs', 'Omni Docs', 'omni docs.png', 'Create and manage documents in one place.', 'Data and Documents'),
  application('omni-edit', 'Omni Edit', 'omni edit.png', 'A space for editing and refining content.', 'Creativity and Design'),
  application('omni-finance', 'Omni Finance', 'omni finance.png', 'A space for organising finance related information.', 'Business'),
  application('omni-health', 'Omni Health', 'omni health.png', 'A place for keeping health information organised.', 'Utilities'),
  application('omni-library', 'Omni Library', 'omni library.png', 'Browse and organise your saved knowledge.', 'Learning'),
  application('omni-mail', 'Omni Mail', 'omni mail.png', 'A focused space for email and communication.', 'Communication'),
  application('omni-meet', 'Omni Meet', 'omni meet.png', 'A space for meetings and shared conversations.', 'Communication'),
  application('omni-motion', 'Omni Motion', 'omni motion.png', 'Tools for movement and visual work.', 'Creativity and Design'),
  application('omni-notes', 'Omni Notes', 'omni notes.png', 'Capture and organise everyday notes.', 'Productivity'),
  application('omni-paint', 'Omni Paint', 'omni paint.png', 'A simple canvas for visual expression.', 'Creativity and Design'),
  application('omni-people', 'Omni People', 'omni people.png', 'Keep people and relationships organised.', 'Communication'),
  application('omni-plan', 'Omni Plan', 'omni plan.png', 'Plan tasks, projects and next steps.', 'Productivity'),
  application('omni-prayer', 'Omni Prayer', 'omni prayer.png', 'A quiet space for prayer and reflection.', 'Utilities'),
  application('omni-route', 'Omni Route', 'omni route.png', 'Plan routes and organise journeys.', 'Utilities'),
  application('omni-sheets', 'Omni Sheets', 'omni sheets.png', 'Create and manage structured tables and data.', 'Data and Documents'),
  application('omni-slides', 'Omni Slides', 'omni slides.png', 'Build clear visual presentations.', 'Data and Documents'),
  application('omni-social', 'Omni Social', 'omni social.png', 'Organise social content and conversations.', 'Communication'),
  application('omni-tools', 'Omni Tools', 'omni tools.png', 'A collection of useful tools for everyday tasks.', 'Productivity'),
];

export const applicationCategories = [
  'All',
  'Productivity',
  'AI and Automation',
  'Business',
  'Creativity and Design',
  'Communication',
  'Utilities',
  'Data and Documents',
  'Learning',
];
