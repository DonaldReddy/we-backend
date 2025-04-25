import { BookRepository } from "../repository/book.repo.js";
import { ReviewRepository } from "../repository/review.repo.js";

const reviewRepo = new ReviewRepository();
const bookRepo = new BookRepository();

export class ReviewService {
	getReviews = async (bookId) => {
		const reviews = await reviewRepo.getReviews(bookId);
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		const book = await bookRepo.getBookById(bookId);
		if (!book) {
			throw new Error("Book not found");
		}

		const result = await reviewRepo.addReview({
			bookId,
			userId,
			comment,
			rating,
		});
		return result;
	};

	refineReview = async (review) => {
		try {
			const response = await fetch(
				"https://openrouter.ai/api/v1/chat/completions",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${process.env.AI_KEY}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						model: "nvidia/llama-3.1-nemotron-nano-8b-v1:free",
						messages: [
							{
								role: "user",
								content:
									`Refine the following book review to increase its word count by about 10%, but cap the total to 100 words. ` +
									`Keep the meaning and tone consistent, and ensure grammatical correctness and readability. ` +
									`Return only the refined review, wrapped in # both at the start and end:\n\n${review}`,
							},
						],
					}),
				},
			);

			if (!response.ok) {
				const error = await response.text();
				throw new Error(`OpenRouter API Error: ${error}`);
			}

			const data = await response.json();
			const refined = data?.choices?.[0]?.message?.content;

			if (!refined) throw new Error("Invalid response from AI");

			// // Extract content between ##
			const match = refined.match(/#([\s\S]*?)#/);

			return match ? match[1].trim() : refined.trim();
		} catch (error) {
			console.error("Review refinement failed:", error);
			return review; // fallback to original review
		}
	};
}
