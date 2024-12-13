import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions = {
    submitAdd: async ({ request, fetch }) => {
      console.log("Sending request for new slug url pair")
      const formData = await request.formData();
      const accessa = formData.get('accessa');
      const sluga = formData.get('sluga');
      const urla = formData.get('urla');
      
      console.log('Adding')
      const response = await fetch('/api/add', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ accessa, sluga, urla })
      });

      if (response.ok) {
        return redirect(303, '/'); // Redirect on success
      }

      return fail(500, { error: 'Server error' });
      
    },

    submitDel: async ({ request, fetch }) => {
        console.log('Sending request to delete slug url pair')
        const formData = await request.formData();
        const accessd = formData.get('accessd');
        const slugd = formData.get('slugd');

        console.log('Deleting')
        const response = await fetch('/api/delete', {
          headers: {
              'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ accessd, slugd })
        });

        if (response.ok) {
          return redirect(303, '/'); // Redirect on success
        }
  
        return fail(500, { error: 'Server error' });

      },
  } satisfies Actions