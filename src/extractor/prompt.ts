export interface AddressInfo {
  country?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
}

export type PromptOutput = AddressInfo[];

export function prompt(text: string) {
  return `
  ${text}
  From this text, extract the country, region, city, postcode, road, and road numbers. Write the response as a valid JSON (use \\" not ').
  
  Each address should be an object with the following format: AddressInfo {
      country?: Optional<string>;
      region?: Optional<string>;
      city?: Optional<string>;
      postalCode?: Optional<string>;
      street?: Optional<string>;
      streetNumber?: Optional<string>;
  }.
  It's okay if some fields are missing, but the object must have the correct structure. All the fields must be strings, always!
  
  The output must ALWAYS be an array of AddressInfo objects. If no address is found, return an empty array. If multiple addresses are found, return all of them.
   If the text looks like an error, return an empty array. YOU MUST ALWAYS RETURN A JSON OUTPUT WITHOUT ANY OTHER TEXT OR ERROR MESSAGES.
 
  `;
}

export function parsePromptOutput(output: string): PromptOutput {
  try {
    const parsed = JSON.parse(output);
    return parsed.filter((address: any) => typeof address === "object");
  } catch (err) {
    console.log("Failed to parse output:", output);
    throw new Error("Failed to parse prompt output");
  }
}
