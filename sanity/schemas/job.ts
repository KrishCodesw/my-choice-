import { defineField, defineType } from 'sanity'

export const jobSchema = defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    // ── Customer details ──────────────────────────
    defineField({ name: 'customerName',  title: 'Customer Name',        type: 'string' }),
    defineField({ name: 'customerPhone', title: 'Customer Phone / WhatsApp', type: 'string' }),
    defineField({ name: 'customerArea',  title: 'Customer Area',         type: 'string' }),

    // ── Job details ───────────────────────────────
    defineField({
      name: 'jobType', title: 'Job Type', type: 'string',
      options: { list: [
        { title: 'Electrical Work',      value: 'electrical'  },
        { title: 'Plumbing',             value: 'plumbing'    },
        { title: 'Carpentry / Fitting',  value: 'carpentry'   },
        { title: 'Tiling',               value: 'tiling'      },
        { title: 'General Labour',       value: 'general'     },
      ]},
    }),
    defineField({ name: 'description',    title: 'Job Description',       type: 'text', rows: 3 }),
    defineField({ name: 'preferredDate',  title: 'Preferred Date',        type: 'date' }),
    defineField({ name: 'scheduledDate',  title: 'Scheduled Date (set by owner)', type: 'date' }),
    defineField({ name: 'scheduledTime',  title: 'Scheduled Time',        type: 'string',
      options: { list: [
        { title: 'Morning (9am–12pm)',   value: '9am–12pm'  },
        { title: 'Afternoon (12pm–4pm)', value: '12pm–4pm' },
        { title: 'Evening (4pm–7pm)',    value: '4pm–7pm'  },
      ]},
    }),

    // ── Assignment ────────────────────────────────
    defineField({
      name: 'assignedWorker', title: 'Assigned Worker',
      type: 'reference', to: [{ type: 'worker' }],
    }),
    defineField({ name: 'ownerNotes', title: 'Owner Notes (internal)', type: 'text', rows: 2 }),

    // ── Status ────────────────────────────────────
    defineField({
      name: 'status', title: 'Job Status', type: 'string',
      initialValue: 'pending',
      options: { list: [
        { title: '🟡 Pending — not assigned yet',  value: 'pending'    },
        { title: '🔵 Assigned — worker confirmed', value: 'assigned'   },
        { title: '🟢 Completed',                   value: 'completed'  },
        { title: '🔴 Cancelled',                   value: 'cancelled'  },
      ]},
    }),

    // ── Rating (after completion) ─────────────────
    defineField({ name: 'rating',       title: 'Customer Rating (1–5)', type: 'number',
      validation: R => R.min(1).max(5) }),
    defineField({ name: 'ratingNote',   title: 'Customer Feedback',     type: 'text', rows: 2 }),

    // ── Timestamps ───────────────────────────────
    defineField({ name: 'requestedAt',  title: 'Requested At',  type: 'datetime' }),
    defineField({ name: 'completedAt',  title: 'Completed At',  type: 'datetime' }),
  ],

  orderings: [
    { title: 'Newest First',  name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
    { title: 'Status',        name: 'status',      by: [{ field: 'status',    direction: 'asc'  }] },
  ],

  preview: {
    select: {
      title:    'customerName',
      subtitle: 'jobType',
      status:   'status',
      worker:   'assignedWorker.name',
    },
    prepare({ title, subtitle, status, worker }) {
      const icons: Record<string, string> = {
        pending: '🟡', assigned: '🔵', completed: '🟢', cancelled: '🔴',
      }
      return {
        title:    `${icons[status] ?? '⚪'} ${title ?? 'Unknown customer'}`,
        subtitle: `${subtitle ?? '—'} ${worker ? `· ${worker}` : '· unassigned'}`,
      }
    },
  },
})
