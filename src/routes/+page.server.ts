import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { hash } from 'bcrypt'

function parseQueryString(queryString: string): Record<string, string> {

  const result: Record<string, string> = {}
  const pairs = queryString.split('&')
  for (const pair of pairs) {

      const [key, value] = pair.split('=')
      if (key && value) {

          result[decodeURIComponent(key)] = decodeURIComponent(value)
      }
  }
  return result;

}

export const actions = {
  
    submitAdd: async ({ request, fetch }) => {
      console.log("Sending request for new slug url pair")
      const formData = await request.formData();

      const searchParams = new URLSearchParams(
        formData as unknown as Record<string, string>,
      ).toString()

      const formDict = parseQueryString(searchParams)

      const plainaccessa:string = formDict['accessa']
      const sluga:string = formDict['sluga']
      const urla:string = formDict['urla']

      const accessa = await hash(plainaccessa, 1)
      
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

        const searchParams = new URLSearchParams(
          formData as unknown as Record<string, string>,
        ).toString()

        const formDict = parseQueryString(searchParams)

        const plainaccessd = formDict['accessd'];
        console.log(plainaccessd)
        const slugd = formDict['slugd'];

        const accessd = await hash(plainaccessd, 1)

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